export const routes = [
    {
      path: '',
      loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'login',
      loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'address',
      loadComponent: () => import('./address/address.component').then(m => m.AddressComponent)
    }
  ];