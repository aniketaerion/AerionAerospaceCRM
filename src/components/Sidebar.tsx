// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';

const menu = [
  { name: 'Dashboard', path: '/dealer/dashboard', icon: '🏠' },
  { name: 'Sales', path: '/dealer/sales/dashboard', icon: '💰' },
  { name: 'CRM', path: '/dealer/crm/dashboard', icon: '👤' },
  { name: 'Inventory', path: '/dealer/inventory/dashboard', icon: '📦' },
  { name: 'Finance', path: '/dealer/finance/dashboard', icon: '📊' },
  { name: 'Service', path: '/dealer/service/dashboard', icon: '🛠️' },
  { name: 'Marketing', path: '/dealer/marketing/dashboard', icon: '📣' },
  { name: 'Reports', path: '/dealer/reports/dashboard', icon: '📈' },
  { name: 'Profile', path: '/dealer/profile', icon: '⚙️' }
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <nav className="flex flex-col gap-2 p-4">
        {menu.map((item) => (
          <NavLink key={item.name} to={item.path} className="font-semibold flex items-center gap-2">
            <span>{item.icon}</span> {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
