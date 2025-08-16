import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageCircle, 
  Settings, 
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Lock,
  Shield,
  Bot,
  Loader2
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Helmet } from "react-helmet-async";

// Authentication schema
const authSchema = z.object({
  password: z.string().min(1, "Parol talab qilinadi")
});

// Post schema for blog creation
const postSchema = z.object({
  title: z.string().min(1, "Sarlavha talab qilinadi"),
  content: z.string().min(1, "Matn talab qilinadi"),
  excerpt: z.string().optional(),
  category: z.string().min(1, "Kategoriya talab qilinadi"),
  tags: z.string().optional(),
  published: z.boolean().default(false)
});

type Post = {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  published: boolean;
  views: number;
  likes: number;
  author: string;
  createdAt: string;
  updatedAt: string;
};

type Lead = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  businessType?: string;
  serviceType?: string;
  budget?: string;
  message?: string;
  status: string;
  priority: string;
  createdAt: string;
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Authentication form
  const authForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      password: ""
    }
  });

  // Post form
  const postForm = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: "",
      published: false
    }
  });

  // Authentication mutation
  const authMutation = useMutation({
    mutationFn: async (data: z.infer<typeof authSchema>) => {
      return await apiRequest("/api/auth/admin", {
        method: "POST",
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token);
      setIsAuthenticated(true);
      toast({
        title: "Muvaffaqiyat",
        description: "Admin panelga kirish amalga oshirildi"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Fetch posts
  const { data: posts = [], isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['/api/admin/posts'],
    enabled: isAuthenticated
  });

  // Fetch leads
  const { data: leads = [], isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ['/api/admin/leads'],
    enabled: isAuthenticated
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (data: z.infer<typeof postSchema>) => {
      const postData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        author: "Akram Farmonov"
      };
      return await apiRequest("/api/admin/posts", {
        method: "POST",
        body: JSON.stringify(postData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/posts'] });
      setIsPostDialogOpen(false);
      setIsEditMode(false);
      setSelectedPost(null);
      postForm.reset();
      toast({
        title: "Muvaffaqiyat",
        description: "Maqola yaratildi"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: async (data: z.infer<typeof postSchema>) => {
      if (!selectedPost) throw new Error("Maqola tanlanmagan");
      const postData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      return await apiRequest(`/api/admin/posts/${selectedPost.id}`, {
        method: "PUT",
        body: JSON.stringify(postData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/posts'] });
      setIsPostDialogOpen(false);
      setIsEditMode(false);
      setSelectedPost(null);
      postForm.reset();
      toast({
        title: "Muvaffaqiyat",
        description: "Maqola yangilandi"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Generate posts mutation
  const generatePostsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/admin/generate-posts", {
        method: "POST",
        body: JSON.stringify({ count: 3 })
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/posts'] });
      toast({
        title: "Muvaffaqiyat", 
        description: data.message
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update lead status mutation
  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest(`/api/admin/leads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/leads'] });
      toast({
        title: "Muvaffaqiyat",
        description: "Mijoz holati yangilandi"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/posts/${id}`, {
        method: "DELETE"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/posts'] });
      toast({
        title: "Muvaffaqiyat",
        description: "Maqola o'chirildi"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleAuth = (values: z.infer<typeof authSchema>) => {
    authMutation.mutate(values);
  };

  const handleCreatePost = (values: z.infer<typeof postSchema>) => {
    if (isEditMode) {
      updatePostMutation.mutate(values);
    } else {
      createPostMutation.mutate(values);
    }
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditMode(true);
    
    // Populate form with existing post data
    postForm.reset({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      category: post.category,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      published: post.published
    });
    
    setIsPostDialogOpen(true);
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setIsEditMode(false);
    postForm.reset({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: "",
      published: false
    });
    setIsPostDialogOpen(true);
  };

  const handleGeneratePosts = () => {
    generatePostsMutation.mutate();
  };

  const handleUpdateLeadStatus = (id: number, status: string) => {
    updateLeadMutation.mutate({ id, status });
  };

  const handleDeletePost = (id: number) => {
    if (confirm("Bu maqolani o'chirishga ishonchingiz komilmi?")) {
      deletePostMutation.mutate(id);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  // Authentication form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Helmet>
          <title>Admin Panel - Akram Farmonov</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>
              Tizimga kirish uchun parolingizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...authForm}>
              <form onSubmit={authForm.handleSubmit(handleAuth)} className="space-y-4">
                <FormField
                  control={authForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parol</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Admin parolini kiriting"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={authMutation.isPending}
                >
                  {authMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Kirish
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Helmet>
        <title>Admin Dashboard - Akram Farmonov</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Akram Farmonov Portfolio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={logout}>
                Chiqish
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="posts">Blog</TabsTrigger>
            <TabsTrigger value="leads">Mijozlar</TabsTrigger>
            <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Maqolalar</p>
                      <p className="text-2xl font-bold">{posts.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Mijozlar</p>
                      <p className="text-2xl font-bold">{leads.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Yangi mijozlar</p>
                      <p className="text-2xl font-bold">
                        {leads.filter(lead => lead.status === 'new').length}
                      </p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ko'rishlar</p>
                      <p className="text-2xl font-bold">
                        {posts.reduce((sum, post) => sum + (post.views || 0), 0)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>So'nggi faollik</CardTitle>
                <CardDescription>Tizimda so'nggi o'zgarishlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Avatar>
                        <AvatarFallback>
                          {lead.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.serviceType || 'Web dasturlash'} xizmati
                        </p>
                      </div>
                      <Badge variant={lead.status === 'new' ? 'default' : 'secondary'}>
                        {lead.status === 'new' ? 'Yangi' : 'Ko\'rilgan'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Maqolalar</h2>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleGeneratePosts}
                  disabled={generatePostsMutation.isPending}
                  variant="outline"
                >
                  {generatePostsMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Bot className="w-4 h-4 mr-2" />
                  AI Maqola
                </Button>
                <Dialog open={isPostDialogOpen} onOpenChange={(open) => {
                  setIsPostDialogOpen(open);
                  if (!open) {
                    setIsEditMode(false);
                    setSelectedPost(null);
                    postForm.reset();
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button onClick={handleNewPost}>
                      <Plus className="w-4 h-4 mr-2" />
                      Yangi Maqola
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {isEditMode ? "Maqolani Tahrirlash" : "Yangi Maqola Yaratish"}
                      </DialogTitle>
                      <DialogDescription>
                        {isEditMode ? "Maqola ma'lumotlarini o'zgartiring" : "Blog uchun yangi maqola yarating"}
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...postForm}>
                      <form onSubmit={postForm.handleSubmit(handleCreatePost)} className="space-y-4">
                        <FormField
                          control={postForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sarlavha</FormLabel>
                              <FormControl>
                                <Input placeholder="Maqola sarlavhasi" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={postForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kategoriya</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Kategoriya tanlang" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="web-development">Web Development</SelectItem>
                                  <SelectItem value="telegram-bots">Telegram Botlar</SelectItem>
                                  <SelectItem value="ai-chatbots">AI Chatbotlar</SelectItem>
                                  <SelectItem value="business-automation">Biznes Avtomatlashtirish</SelectItem>
                                  <SelectItem value="tips">Maslahatlar</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={postForm.control}
                          name="excerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Qisqacha mazmun</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Maqola qisqacha mazmuni..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={postForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>To'liq matn</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Maqola to'liq matni..." 
                                  rows={10}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={postForm.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teglar</FormLabel>
                              <FormControl>
                                <Input placeholder="javascript, react, web (vergul bilan ajrating)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={postForm.control}
                          name="published"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>E'lon qilish</FormLabel>
                                <div className="text-sm text-muted-foreground">
                                  Maqolani darhol e'lon qilish
                                </div>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end space-x-2">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => {
                              setIsPostDialogOpen(false);
                              setIsEditMode(false);
                              setSelectedPost(null);
                              postForm.reset();
                            }}
                          >
                            Bekor qilish
                          </Button>
                          <Button 
                            type="submit"
                            disabled={createPostMutation.isPending || updatePostMutation.isPending}
                          >
                            {(createPostMutation.isPending || updatePostMutation.isPending) && 
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {isEditMode ? "Yangilash" : "Yaratish"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Posts List */}
            <div className="grid gap-4">
              {postsLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                </div>
              ) : posts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Hozircha maqolalar yo'q</p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post: Post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {post.excerpt || post.content.substring(0, 150) + '...'}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <Badge variant={post.published ? 'default' : 'secondary'}>
                              {post.published ? 'Chop etilgan' : 'Qoralama'}
                            </Badge>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {post.views || 0}
                            </span>
                            <span>{post.category}</span>
                            <span>{new Date(post.createdAt).toLocaleDateString('uz-UZ')}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditPost(post)}
                            data-testid={`button-edit-post-${post.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            disabled={deletePostMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mijozlar</h2>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Holat bo'yicha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barchasi</SelectItem>
                    <SelectItem value="new">Yangi</SelectItem>
                    <SelectItem value="contacted">Bog'lanildi</SelectItem>
                    <SelectItem value="converted">Mijozga aylandi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {leadsLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                </div>
              ) : leads.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Hozircha mijozlar yo'q</p>
                  </CardContent>
                </Card>
              ) : (
                leads.map((lead: Lead) => (
                  <Card key={lead.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-bold">{lead.name}</h3>
                            <Badge 
                              variant={lead.status === 'new' ? 'default' : 'secondary'}
                            >
                              {lead.status === 'new' ? 'Yangi' : 
                               lead.status === 'contacted' ? 'Bog\'lanildi' : 'Mijoz'}
                            </Badge>
                            <Badge variant="outline">
                              {lead.priority === 'high' ? 'Yuqori' :
                               lead.priority === 'medium' ? 'O\'rta' : 'Past'}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            {lead.email && <p>Email: {lead.email}</p>}
                            {lead.phone && <p>Telefon: {lead.phone}</p>}
                            {lead.serviceType && <p>Xizmat: {lead.serviceType}</p>}
                            {lead.budget && <p>Byudjet: {lead.budget}</p>}
                            <p>Sana: {new Date(lead.createdAt).toLocaleDateString('uz-UZ')}</p>
                          </div>
                          {lead.message && (
                            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                              <p className="text-sm">{lead.message}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {lead.status === 'new' && (
                            <Button 
                              size="sm"
                              onClick={() => handleUpdateLeadStatus(lead.id, 'contacted')}
                            >
                              Bog'lanildi
                            </Button>
                          )}
                          {lead.status === 'contacted' && (
                            <Button 
                              size="sm"
                              onClick={() => handleUpdateLeadStatus(lead.id, 'converted')}
                            >
                              Mijozga aylandi
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tizim Sozlamalari</CardTitle>
                <CardDescription>Admin panel sozlamalari</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI Blog Generation</Label>
                    <p className="text-sm text-muted-foreground">
                      Gemini AI orqali avtomatik blog yaratish
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Bildirimlari</Label>
                    <p className="text-sm text-muted-foreground">
                      Yangi mijozlar haqida email yuborish
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Sayt statistikasini yig'ish
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;