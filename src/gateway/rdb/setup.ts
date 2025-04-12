import prisma from "../../lib/prisma";


export const handle_setup = async (): Promise<void> => {
    const default_roles = ["admin", "writer", "reader"];
    for (const default_role of default_roles) {
        await prisma.role.upsert({
          where: { name: default_role },
          update: {},
          create: { name: default_role },
        });
      }
}
