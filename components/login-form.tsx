'use client';

import { useActionState } from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { login, LoginState } from '@/app/(auth)/login/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader, MessageCircle } from 'lucide-react';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {
      success: null,
      message: '',
    }
  );

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold text-foreground">
          Login
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Digite seu e-mail para receber o link de acesso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="fulano@gmail.com"
                required
              ></Input>
            </div>
            {state.success === true && (
              <Alert className="text-muted-foreground">
                <MessageCircle className="h-4 w-4 !text-green-600" />
                <AlertTitle className="text-sm font-medium">
                  Email enviado com sucesso!
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">
                  Verifique sua caixa de entrada e clique no link para acessar o
                  app.
                </AlertDescription>
              </Alert>
            )}
            {state.success === false && (
              <Alert variant="destructive" className="text-muted-foreground">
                <MessageCircle className="h-4 w-4 !text-red-600" />
                <AlertTitle className="text-sm font-medium">
                  Ocorreu um erro!
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">
                  {state.message}
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full ">
              {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
