import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Button Component Examples - Todo App',
  description: '버튼 컴포넌트의 다양한 사용 예시를 확인할 수 있습니다.',
};

export default function ButtonExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        marginBottom: '20px'
      }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <a 
            href="/" 
            style={{
              color: '#7c3aed',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            ← Todo 앱으로 돌아가기
          </a>
        </nav>
      </header>
      {children}
    </>
  );
} 