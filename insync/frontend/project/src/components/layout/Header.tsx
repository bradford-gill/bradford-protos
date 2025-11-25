import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Search, Bell, LogOut, Activity } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'InSync Health' }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto flex h-16 items-center px-8">
        <div className="flex items-center gap-3 mr-12">
          <div className="p-1.5 bg-gray-900 rounded-lg">
            <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">{title}</span>
        </div>

        <nav className="flex gap-1 mr-auto">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            Dashboard
          </Button>
          <Button variant="ghost" onClick={() => navigate('/care-team')} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            Care Team
          </Button>
          <Button variant="ghost" onClick={() => navigate('/patients')} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            Patients
          </Button>
          <Button variant="ghost" onClick={() => navigate('/settings')} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            Settings
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search patients..."
              className="pl-10 h-9 border-gray-300 focus:border-gray-900"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-gray-100">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-gray-900 text-white text-sm font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{user?.name}</span>
                  <span className="text-xs text-gray-500 font-normal capitalize">{user?.role.replace('_', ' ')}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
