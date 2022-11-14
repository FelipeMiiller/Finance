export type userFaunaDBType = {
  ref: { id: string };

  data: {
    name: string;
    email: string;
    image: string;
    emailVerified: string;
    date: Date;
  };
};

export type companyFaunaDB = {
  ref: { id: string };
  data: {
    informations: {
      name: string;
      document: string;
      email: string;
      date: Date;
    };
  };
};

export type permissionFaunaDB = {
  ref: { id: string };
  data: {
    companyRef:string;
    userRef:string;
    date: string;
    permission: "admin" | "read"|"write";
  };
};
