import './App.css'
import { Chat } from './pages/chat/chat'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'
import Login from './pages/login';
import Dashboard from './pages/dashboard';

function App() {
  return (
		<ThemeProvider>
			<Router>
				<div className="w-full h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
					<Routes>
						<Route path="/Chat" element={<Chat />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />} />
					</Routes>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;