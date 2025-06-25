
import React from 'react';
import { FileText, User, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    author: {
      id: string;
      name: string | null;
      email: string;
    };
  };
  onEdit: (post: any) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (id: string, published: boolean) => void;
}

const PostCard = ({ post, onEdit, onDelete, onTogglePublished }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{post.title}</h3>
            <Badge variant={post.published ? "default" : "secondary"}>
              {post.published ? "Publicado" : "Rascunho"}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <User className="w-4 h-4 mr-1" />
            {post.author.name || post.author.email}
          </div>
          
          {post.content && (
            <p className="text-gray-700 text-sm line-clamp-3 mb-4">
              {post.content.length > 150 
                ? `${post.content.substring(0, 150)}...` 
                : post.content
              }
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onTogglePublished(post.id, !post.published)}
          className={`flex items-center space-x-1 ${
            post.published 
              ? 'hover:bg-orange-50 hover:border-orange-300 text-orange-600' 
              : 'hover:bg-green-50 hover:border-green-300 text-green-600'
          }`}
        >
          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{post.published ? 'Despublicar' : 'Publicar'}</span>
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(post)}
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(post.id)}
            className="hover:bg-red-50 hover:border-red-300 text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
