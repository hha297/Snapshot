import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';

const rootElement = document.getElementById('root');

if (rootElement) {
        ReactDOM.createRoot(rootElement).render(
                <BrowserRouter>
                        <QueryProvider>
                                <AuthProvider>
                                        <App />
                                </AuthProvider>
                        </QueryProvider>
                </BrowserRouter>,
        );
} else {
        console.error("Root element with id 'root' not found.");
}
