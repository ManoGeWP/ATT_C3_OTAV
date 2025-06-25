
import React, { useState } from 'react';
import { Users, FileText, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import UserCard from '@/components/UserCard';
import PostCard from '@/components/PostCard';
import { useUsers } from '@/hooks/useUsers';
import { usePosts } from '@/hooks/usePosts';

const Admin = () => {
  const { users, loading: usersLoading, createUser, updateUser, deleteUser } = useUsers();
  const { posts, loading: postsLoading, createPost, updatePost, deletePost, togglePostPublished } = usePosts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);

  const [userForm, setUserForm] = useState({
    name: '',
    email: ''
  });

  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    published: false,
    author_id: ''
  });

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      await updateUser(editingUser.id, userForm);
    } else {
      await createUser(userForm);
    }
    
    setUserForm({ name: '', email: '' });
    setEditingUser(null);
    setIsUserDialogOpen(false);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      await updatePost(editingPost.id, postForm);
    } else {
      await createPost(postForm);
    }
    
    setPostForm({ title: '', content: '', published: false, author_id: '' });
    setEditingPost(null);
    setIsPostDialogOpen(false);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserForm({ name: user.name || '', email: user.email });
    setIsUserDialogOpen(true);
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content || '',
      published: post.published,
      author_id: post.author_id
    });
    setIsPostDialogOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
  };

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
  };

  const handleTogglePostPublished = async (id: string, published: boolean) => {
    await togglePostPublished(id, published);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários e posts do sistema</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar usuários ou posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Usuários ({users.length})</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Posts ({posts.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Usuários</h2>
              <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Novo Usuário</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUserSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={userForm.name}
                        onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                        placeholder="Nome do usuário"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingUser ? 'Atualizar' : 'Criar'} Usuário
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {usersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6">
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Posts</h2>
              <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Novo Post</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? 'Editar Post' : 'Novo Post'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        placeholder="Título do post"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Conteúdo</Label>
                      <Textarea
                        id="content"
                        value={postForm.content}
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                        placeholder="Conteúdo do post..."
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Autor</Label>
                      <Select
                        value={postForm.author_id}
                        onValueChange={(value) => setPostForm({ ...postForm, author_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o autor" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name || user.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={postForm.published}
                        onCheckedChange={(checked) => setPostForm({ ...postForm, published: checked })}
                      />
                      <Label htmlFor="published">Publicar imediatamente</Label>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingPost ? 'Atualizar' : 'Criar'} Post
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {postsLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-24" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                    onTogglePublished={handleTogglePostPublished}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
