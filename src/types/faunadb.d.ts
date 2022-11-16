


export type userFaunaDBType = {
  ref: { id: string } | undefined;

  data: {
    name: string;
    email: string;
    image: string;
    emailVerified: string;
    date: Date;
  };
} | Object |undefined;

export type companyFaunaDBType = {
  ref: { id: string } | undefined;
  data: {
    informations: {
      name: string;
      document: string;
      email: string;
      date: Date;
    };
  };
} | Object |undefined;

export type permissionFaunaDBType = {
  ref: { id: string } | undefined;
  data: {
    companyRef:string;
    userRef:string;
    date: string;
    permission: "admin" | "read"|"write";
  };
} | Object |undefined;
