import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useDarkMode } from 'usehooks-ts';
import { useTheme } from './hook/useTheme';
import { publicProvider } from 'wagmi/dist/providers/public';
import { chain, defaultChains, useAccount, useConnect } from 'wagmi';
// import Buffer from 'buffer';

function App() {
  const [count, setCount] = useState(0);

  useTheme();

  const { toggle } = useDarkMode();

  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  const { address } = useAccount();

  console.log('connectors: ', window);

  return (
    <div className='App dark:bg-gray-700'>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <h1>{address || 'nothing  '}</h1>
        <button onClick={toggle}>change mode</button>
        <div className='flex flex-col'>
          {connectors.map(connector => (
            <button onClick={() => connect({ connector })} key={connector.id}>
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
          ))}
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
