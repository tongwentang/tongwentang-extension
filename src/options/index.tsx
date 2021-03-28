import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Header, Navbar } from './components';
import { usePage } from './hooks/page';

function App() {
  const [page, setPage] = usePage();
  const Page = useMemo(() => page.node, [page]);

  return (
    <main style={{ padding: '5em 10%' }}>
      <Header />
      <Navbar page={page} setPage={setPage} />
      <Page />
    </main>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
