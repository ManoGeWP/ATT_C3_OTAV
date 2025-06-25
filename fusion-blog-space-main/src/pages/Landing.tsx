
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Database, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sistema CRUD - Web 2
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Projeto acadêmico desenvolvido para a disciplina C3 - Desenvolvimento Web 2
            </p>
            <p className="text-md text-gray-500 mb-8 max-w-2xl mx-auto">
              Sistema completo de gerenciamento (CRUD) de usuários e posts utilizando React, TypeScript e Supabase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg font-semibold"
                >
                  Acessar Sistema
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Funcionalidades */}
      <div className="py-16 bg-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades do Sistema
            </h2>
            <p className="text-lg text-gray-600">
              Operações CRUD completas implementadas com tecnologias modernas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Gerenciamento de Usuários</h3>
              <p className="text-gray-600 mb-4">
                Criar, visualizar, editar e excluir usuários do sistema
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Cadastro de nome e email</li>
                <li>• Listagem em cards responsivos</li>
                <li>• Edição inline de dados</li>
                <li>• Exclusão com confirmação</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sistema de Posts</h3>
              <p className="text-gray-600 mb-4">
                Criar, visualizar, editar e excluir posts dos usuários
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Criação de posts com título e conteúdo</li>
                <li>• Seleção de autor (usuário)</li>
                <li>• Status de publicação (publicado/rascunho)</li>
                <li>• Controle completo de publicação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tecnologias */}
      <div className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Tecnologias Utilizadas
            </h2>
            <p className="text-lg text-gray-300">
              Stack moderna para desenvolvimento web
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Frontend</h3>
              <p className="text-gray-300">React + TypeScript + Tailwind CSS</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Backend</h3>
              <p className="text-gray-300">Supabase (PostgreSQL + API)</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Recursos</h3>
              <p className="text-gray-300">CRUD + Validação + Responsivo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Acadêmico */}
      <div className="py-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-gray-400">
            Projeto desenvolvido para a disciplina C3 - Desenvolvimento Web 2
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Análise e Desenvolvimento de Sistemas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
