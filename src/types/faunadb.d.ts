


export type userFaunaDBType =
  | {
      id: string;
      name: string;
      email: string;
      image: string;
      emailVerified: string;
      date: Date;
    }
  | Object
  | Promise;

export type companyFaunaDBType =
  | {
      id: string;
      id: string;
      name: string;
      document: string;
      email: string;
      date: Date;
    }
  | Object
  | Promise;

export type permissionFaunaDBType =
  | {
      id: string;
      companyId: string;
      userId: string;
      date: string;
      permission: "admin" | "read" | "write";
    }
  | Object
  | Promise;
