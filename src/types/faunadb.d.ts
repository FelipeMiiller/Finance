


export type userFaunaDBType = {
  ref: { id: string } | Promise;

  data: {
    name: string;
    email: string;
    image: string;
    emailVerified: string;
    date: Date;
  };
} | Object |  Promise;

export type companyFaunaDBType = {
  ref: { id: string } |  Promise;
  data: {
    informations: {
      name: string;
      document: string;
      email: string;
      date: Date;
    };
  };
} | Object |  Promise;

export type permissionFaunaDBType = {
  ref: { id: string } | undefined;
  data: {
    companyRef:string;
    userRef:string;
    date: string;
    permission: "admin" | "read"|"write";
  };
} | Object |undefined;
