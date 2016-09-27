export const Permissions = [
  {name: 'read'}, {name: 'write'}, {name: 'delete'}, {name: 'modify'}
];

export const Usertypes = [
  {name: 'developer'}, {name: 'admin'}, {name: 'consumer'}
];

export const UsertypeToPermissionMap =
  {
    developer: ['read', 'write', 'delete', 'modify'],
    admin: ['read', 'write', 'delete', 'modify'],
    consumer: ['read']
  };

export const users = [
  {
    email: 'admin123@gmail.com',
    name: 'Cool Dude',
    password: 'password',
    active: true
  },
  {
    email: 'admin@gmail.com',
    name: 'Al Gore',
    password: 'password',
    active: true
  },
  {
    email: 'developer_admin@gmail.com',
    name: 'Lulz Cat',
    password: 'password',
    active: true
  },
  {
    email: 'user@gmail.com',
    name: 'Monarail Kitty',
    password: 'password',
    active: true
  },
  {
    email: 'inactiveDude@gmail.com',
    name: 'Sloth Coder',
    password: 'password',
    active: false
  }
];
export const userTypesAssignments = [2, 2, 1, 3, 1];

export const projects = [
  {
    name: 'Polo Shirts Christmas Promo',
    description: 'Doner pork loin sirloin tri-tip sausage flank cupim, shankle jowl short ribs. Strip steak filet mignon ball tip spare ribs, meatball hamburger chuck. Shankle ground round shank andouille shoulder tenderloin chicken kevin bacon meatball. Meatloaf tenderloin cow pastrami alcatra biltong.'
  },
  {
    name: 'Jeggings Promo Site',
    description: 'Tenderloin landjaeger drumstick frankfurter doner. Meatloaf hamburger pork chop meatball fatback ball tip drumstick kevin tenderloin salami flank shoulder tail bacon. Prosciutto capicola bacon fatback beef ribs. Brisket alcatra pig spare ribs pastrami. Pork belly pork chop ball tip capicola pastrami, pancetta pig spare ribs ham shankle beef ribs porchetta venison.'
  }
];

export const categories = [
  {
    name: 'assets',
    visible: true
  },
  {
    name: 'banners',
    visible: true
  },
  {
    name: 'brands',
    visible: true
  },
  {
    name: 'pages',
    visible: true
  },
  {
    name: 'scripts',
    visible: false
  }
];

export const datatypes = [
  {
    name: 'asset',
    description: 'asset',
    visible: true,
    categoryId: 1
  },
  {
    name: 'script',
    description: 'some scripts',
    visible: true,
    categoryId: 2
  }
];
export const fields = [
  {
    name: 'HTML Template',
    description: 'some HTML'
  },
  {
    name: 'CSS',
    description: 'some CSS'
  }
];
export const assets = [
  {
    name: 'Lots of Macys Logos',
    description: 'very useful logos',
    url: 'http://www.macys.com'
  },
  {
    name: 'Style Guide',
    description: 'some style guides',
    url: 'http://www.newstimes.com'
  },
  {
    name: 'Partner links',
    description: 'some HTML',
    url: 'http://www.amazon.com'
  }
];
