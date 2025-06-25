
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PostWithAuthor {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(id, name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os posts.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: { title: string; content: string; published: boolean; author_id: string }) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select(`
          *,
          author:profiles(id, name, email)
        `)
        .single();

      if (error) throw error;
      
      await fetchPosts(); // Refresh the list
      toast({
        title: "Post criado",
        description: "Novo post foi criado com sucesso.",
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o post.",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updatePost = async (id: string, postData: { title: string; content: string; published: boolean; author_id: string }) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ ...postData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(`
          *,
          author:profiles(id, name, email)
        `)
        .single();

      if (error) throw error;
      
      await fetchPosts(); // Refresh the list
      toast({
        title: "Post atualizado",
        description: "O post foi atualizado com sucesso.",
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o post.",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts(); // Refresh the list
      toast({
        title: "Post removido",
        description: "O post foi removido com sucesso.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o post.",
        variant: "destructive"
      });
    }
  };

  const togglePostPublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts(); // Refresh the list
      toast({
        title: published ? "Post publicado" : "Post despublicado",
        description: `O post foi ${published ? 'publicado' : 'despublicado'} com sucesso.`,
      });
    } catch (error) {
      console.error('Error toggling post published:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do post.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    togglePostPublished,
    refreshPosts: fetchPosts
  };
};
