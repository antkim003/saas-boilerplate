export const Permissions = [
  {name: 'read'}, {name: 'write'}, {name: 'delete'}, {name: 'modify'}
];

export const Usertypes = [
  {name: 'developer'}, {name: 'admin'}, {name: 'consumer'}
];

export const users = [
  {
    email: 'admin123@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'admin@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'developer_admin@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'user@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'inactiveDude@gmail.com',
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
    name: 'Mini site',
    visible: true
  },
  {
    name: 'In and out',
    visible: true
  },
  {
    name: 'Large site',
    visible: true
  },
  {
    name: 'Partner site',
    visible: true
  },
  {
    name: 'Mobile only site',
    visible: false
  }
];

export const datatypes = [
  {
    name: 'recipe',
    description: 'how to cook things',
    visible: true,
    fields: {"recipe": "text", "code": "html", "photos": "high res"},
    categoryId: 1
  },
  {
    name: 'pattern',
    description: 'how to make things',
    visible: true,
    fields: {"pattern": "text stuff", "code": "css", "expiration": "soon"},
    categoryId: 2
  }
]
