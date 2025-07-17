import PostCardList from '@/components/PostCardList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
            Featured Blog Posts
          </h1>
          <p className="text-purple-700 text-lg max-w-2xl mx-auto">
            Discover our latest articles and insights from industry experts
          </p>
        </div>
        <PostCardList />
      </div>
    </div>
  );
}