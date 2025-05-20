'use client';

import { UserLogged } from '@/app/app/grupos/novo/page';
import { toast } from 'sonner';
import { useActionState, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader, Mail, Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { createGroup, CreateGroupState } from '@/app/app/grupos/novo/actions';

type Props = {
  loggedUser: UserLogged;
};

interface Participant {
  name: string;
  email: string;
}

export default function NewGroupForm({ loggedUser }: Props) {
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', email: loggedUser.email },
  ]);
  const [groupName, setGroupName] = useState<string>('');

  const [state, formAction, pending] = useActionState<
    CreateGroupState,
    FormData
  >(createGroup, {
    success: null,
    message: '',
  });

  function updateParticipant(
    index: number,
    field: keyof Participant,
    value: string
  ) {
    const updatedParticipants = [...participants];

    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  }

  function removeParticipant(index: number) {
    const updatedParticipants = [...participants];

    updatedParticipants.splice(index, 1);

    setParticipants(updatedParticipants);
  }

  function addParticipant() {
    setParticipants((prev) => [...prev, { name: '', email: '' }]);
  }

  useEffect(() => {
    if (state.success === true) {
      toast.success('Grupo criado com sucesso!');
    }
    if (state.success === false) {
      toast.error(state.message || 'Erro ao criar grupo');
    }
  }, [state]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Grupo</CardTitle>
        <CardDescription>
          Convide seus amigos para o amigo secreto
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Nome do grupo</Label>
            <Input
              id="group-name"
              name="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nome do grupo"
              required
            ></Input>
          </div>

          <h2 className="!mt-12 mb-8">Participantes</h2>
          {participants.map((participant, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-end space-y-4 
            md:space-y-0 md:space-x-4"
            >
              <div className="flex-grow space-y-2 w-full">
                <Label htmlFor={`name-${index}`}>Nome</Label>
                <Input
                  id={`name-${index}`}
                  name="name"
                  value={participant.name}
                  onChange={(e) => {
                    updateParticipant(index, 'name', e.target.value);
                  }}
                  placeholder="Nome do participante"
                  required
                />
              </div>

              <div className="flex-grow space-y-2 w-full">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  name="email"
                  type="email"
                  value={participant.email}
                  onChange={(e) => {
                    updateParticipant(index, 'email', e.target.value);
                  }}
                  placeholder="Email do participante"
                  className="readonly:text-muted-foreground"
                  readOnly={participant.email === loggedUser.email}
                  required
                />
              </div>

              <div className="min-w-9">
                {participants.length > 1 &&
                  participant.email !== loggedUser.email && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeParticipant(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={addParticipant}
            className="w-full md:w-auto"
          >
            Adicionar participante
          </Button>
          <Button type="submit" className="w-full md:w-auto">
            <Mail className="h-4 w-4 mr-2" />
            Criar grupo e enviar convite
            {pending && <Loader className="animate-spin h-4 w-4 ml-2" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
