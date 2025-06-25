
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
  posts?: Post[];
}

export interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          posts (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: { name: string; email: string }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchUsers(); // Refresh the list
      toast({
        title: "Usuário criado",
        description: "Novo usuário foi criado com sucesso.",
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o usuário.",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateUser = async (id: string, userData: { name: string; email: string }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...userData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchUsers(); // Refresh the list
      toast({
        title: "Usuário atualizado",
        description: "As informações do usuário foram atualizadas com sucesso.",
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o usuário.",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers(); // Refresh the list
      toast({
        title: "Usuário removido",
        description: "O usuário foi removido com sucesso.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o usuário.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    createUser,
    updateUser,
    deleteUser,
    refreshUsers: fetchUsers
  };
};
