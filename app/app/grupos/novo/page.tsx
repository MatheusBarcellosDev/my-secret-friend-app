import NewGroupForm from '@/components/newGroupForm';
import { createClient } from '@/utils/supabase/server';

export type UserLogged = {
  id: string;
  email: string;
};

export default async function NovoGrupoPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const loggedUser: UserLogged = {
    id: data.user!.id,
    email: data.user!.email!,
  };

  return (
    <div className="mt-40">
      <NewGroupForm loggedUser={loggedUser} />
    </div>
  );
}
