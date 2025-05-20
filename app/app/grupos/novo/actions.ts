'use server';

import { createClient } from '@/utils/supabase/server';

export type CreateGroupState = {
  success: null | boolean;
  message?: string;
};

export async function createGroup(
  _previousState: CreateGroupState,
  formData: FormData
) {
  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError) {
    return {
      success: false,
      message: 'Erro ao obter usuário autenticado',
    };
  }

  const names = formData.getAll('name') as string[];
  const emails = formData.getAll('email') as string[];
  const groupName = formData.get('group-name') as string;

  console.log('names', names);
  console.log('emails', emails);
  console.log('group-name', groupName);
}
