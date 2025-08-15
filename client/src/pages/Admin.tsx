import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Briefcase, 
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Lock,
  Unlock
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import type { Post, Project, Service, Lead, Analytics } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", password);
        setIsAuthenticated(true);
        toast({
          title: "Kirish muvaffaqiyatli",
          description: "Admin panelga xush kelibsiz",
        });
      } else {
        throw new Error(result.error || "Parol noto'g'ri");
      }
    } catch (error) {
      toast({
        title: "Kirish xatosi",
        description: error instanceof Error ? error.message : "Parolni tekshiring",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setPassword("");
  };

  // API helper with auth
  const apiRequest = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("admin_token");
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  // Data queries
  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
    queryFn: async () => {
      const response = await apiRequest("/api/admin/leads");
      if (!response.ok) throw new Error("Failed to fetch leads");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/admin/posts"],
    queryFn: async () => {
      const response = await apiRequest("/api/posts?published=false");
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
    queryFn: async () => {
      const response = await apiRequest("/api/admin/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics[]>({
    queryKey: ["/api/admin/analytics"],
    queryFn: async () => {
      const response = await apiRequest("/api/admin/analytics?limit=100");
      if (!response.ok) throw new Error("Failed to fetch analytics");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // Generate blog posts mutation
  const generatePostsMutation = useMutation({
    mutationFn: async (count: number) => {
      const response = await apiRequest("/api/admin/generate-posts", {
        method: "POST",
        body: JSON.stringify({ count }),
      });
      if (!response.ok) throw new Error("Failed to generate posts");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      toast({
        title: "Maqolalar yaratildi",
        description: "Yangi blog maqolalari muvaffaqiyatli yaratildi",
      });
    },
    onError: () => {
      toast({
        title: "Xatolik",
        description: "Maqola yaratishda xatolik yuz berdi",
        variant: "destructive"
      });
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      toast({
        title: "Maqola o'chirildi",
        description: "Maqola muvaffaqiyatli o'chirildi",
      });
    },
  });

  // Update lead mutation
  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest(`/api/admin/leads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update lead");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({
        title: "Lead yangilandi",
        description: "Lead holati muvaffaqiyatli yangilandi",
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Panel - Kirish</title>
        </Helmet>
        
        <Layout>
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <Lock className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-6 text-3xl font-bold text-foreground">
                  Admin Panel
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Kirish uchun parolni kiriting
                </p>
              </div>
              
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="password">Admin Paroli</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolni kiriting"
                    required
                    className="mt-1"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Kirilmoqda...
                    </>
                  ) : (
                    <>
                      <Unlock className="-ml-1 mr-3 h-5 w-5" />
                      Kirish
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | Akram Farmonov</title>
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <Button variant="outline" onClick={handleLogout}>
              <Lock className="mr-2 h-4 w-4" />
              Chiqish
            </Button>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="leads">Leadlar</TabsTrigger>
              <TabsTrigger value="posts">Blog</TabsTrigger>
              <TabsTrigger value="projects">Loyihalar</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Jami Leadlar</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{leads?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Yangi: {leads?.filter(l => l.status === "new").length || 0}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blog Maqolalari</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{posts?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Tasdiqlanmagan: {posts?.filter(p => !p.published).length || 0}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Loyihalar</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Faol: {projects?.filter(p => p.published).length || 0}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Bugun
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Tezkor Amallar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => generatePostsMutation.mutate(3)}
                      disabled={generatePostsMutation.isPending}
                    >
                      {generatePostsMutation.isPending ? (
                        <RefreshCw className="animate-spin mr-2 h-4 w-4" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      3ta Maqola Yaratish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads">
              <Card>
                <CardHeader>
                  <CardTitle>Leadlar</CardTitle>
                </CardHeader>
                <CardContent>
                  {leadsLoading ? (
                    <div className="text-center py-8">Yuklanmoqda...</div>
                  ) : (
                    <div className="space-y-4">
                      {leads?.map((lead) => (
                        <div key={lead.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{lead.name}</h3>
                            <Badge variant={
                              lead.status === "new" ? "default" :
                              lead.status === "contacted" ? "secondary" :
                              lead.status === "converted" ? "default" : "outline"
                            }>
                              {lead.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {lead.email && <p>Email: {lead.email}</p>}
                            {lead.phone && <p>Telefon: {lead.phone}</p>}
                            {lead.serviceType && <p>Xizmat: {lead.serviceType}</p>}
                            {lead.budget && <p>Byudjet: {lead.budget}</p>}
                            <p>Vaqt: {new Date(lead.createdAt).toLocaleDateString("uz-UZ")}</p>
                          </div>
                          {lead.message && (
                            <p className="mt-2 text-sm">{lead.message}</p>
                          )}
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateLeadMutation.mutate({ id: lead.id, status: "contacted" })}
                            >
                              Aloqaga chiqildi
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateLeadMutation.mutate({ id: lead.id, status: "converted" })}
                            >
                              Mijozga aylandi
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Posts Tab */}
            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Maqolalari</CardTitle>
                </CardHeader>
                <CardContent>
                  {postsLoading ? (
                    <div className="text-center py-8">Yuklanmoqda...</div>
                  ) : (
                    <div className="space-y-4">
                      {posts?.map((post) => (
                        <div key={post.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{post.title}</h3>
                            <div className="flex gap-2">
                              <Badge variant={post.published ? "default" : "outline"}>
                                {post.published ? "Chop etilgan" : "Tasdiqlanmagan"}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deletePostMutation.mutate(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Kategoriya: {post.category}</p>
                            <p>Slug: {post.slug}</p>
                            <p>Ko'rishlar: {post.views}</p>
                            <p>Vaqt: {new Date(post.createdAt).toLocaleDateString("uz-UZ")}</p>
                          </div>
                          {post.excerpt && (
                            <p className="mt-2 text-sm">{post.excerpt}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Loyihalar</CardTitle>
                </CardHeader>
                <CardContent>
                  {projectsLoading ? (
                    <div className="text-center py-8">Yuklanmoqda...</div>
                  ) : (
                    <div className="space-y-4">
                      {projects?.map((project) => (
                        <div key={project.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{project.title}</h3>
                            <Badge variant={project.published ? "default" : "outline"}>
                              {project.published ? "Faol" : "Nofaol"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Kategoriya: {project.category}</p>
                            <p>Mijoz: {project.client}</p>
                            <p>Yil: {project.year}</p>
                          </div>
                          <p className="mt-2 text-sm">{project.shortDescription || project.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="text-center py-8">Yuklanmoqda...</div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                              {analytics?.filter(a => a.device === "mobile").length || 0}
                            </div>
                            <p className="text-sm text-muted-foreground">Mobil foydalanuvchilar</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                              {analytics?.filter(a => a.device === "desktop").length || 0}
                            </div>
                            <p className="text-sm text-muted-foreground">Desktop foydalanuvchilar</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                              {new Set(analytics?.map(a => a.path)).size || 0}
                            </div>
                            <p className="text-sm text-muted-foreground">Noyob sahifalar</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
}