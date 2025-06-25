
-- Criar tabela de usuários (profiles)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de posts
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS (Row Level Security) nas tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela profiles (permitir acesso público para o admin)
CREATE POLICY "Allow public read access to profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to profiles" ON public.profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to profiles" ON public.profiles
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to profiles" ON public.profiles
  FOR DELETE USING (true);

-- Políticas para a tabela posts (permitir acesso público para o admin)
CREATE POLICY "Allow public read access to posts" ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to posts" ON public.posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to posts" ON public.posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to posts" ON public.posts
  FOR DELETE USING (true);

-- Inserir alguns dados de exemplo
INSERT INTO public.profiles (email, name) VALUES
  ('joao@email.com', 'João Silva'),
  ('maria@email.com', 'Maria Santos');

INSERT INTO public.posts (title, content, published, author_id) VALUES
  ('Como criar um blog moderno', 'Neste post vamos explorar as melhores práticas para criar um blog moderno e responsivo usando React e outras tecnologias atuais.', true, (SELECT id FROM public.profiles WHERE email = 'joao@email.com')),
  ('Guia completo de TypeScript', 'TypeScript tem se tornado cada vez mais popular. Vamos ver como usar suas funcionalidades para escrever código mais seguro.', false, (SELECT id FROM public.profiles WHERE email = 'joao@email.com')),
  ('Introdução ao React Hooks', 'Os Hooks revolucionaram a forma como escrevemos componentes React. Aprenda os principais hooks e como utilizá-los.', true, (SELECT id FROM public.profiles WHERE email = 'maria@email.com'));
