
import React from 'react';
import { User, Mail, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserCardProps {
  user: {
    id: string;
    email: string;
    name: string | null;
    posts?: Array<{ id: string; title: string; published: boolean }>;
  };
  onEdit: (user: any) => void;
  onDelete: (id: string) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const publishedPosts = user.posts?.filter(post => post.published).length || 0;
  const totalPosts = user.posts?.length || 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name || 'Sem nome'}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Mail className="w-4 h-4 mr-1" />
              {user.email}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(user)}
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(user.id)}
            className="hover:bg-red-50 hover:border-red-300 text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-600">
          <FileText className="w-4 h-4 mr-1" />
          {totalPosts} posts total
        </div>
        <div className="text-green-600 font-medium">
          {publishedPosts} publicados
        </div>
      </div>
    </div>
  );
};

export default UserCard;
