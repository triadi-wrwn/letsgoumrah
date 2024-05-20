import { Input } from '@/components/ui-base/input';
import { Icons } from '@/lib/icons/icons';
import { cn } from '@/lib/utility/cn';
import useAuthentication from '../hooks/use-authentication';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-base/form';
import { Button } from '@/components/ui-base/button';
import { Checkbox } from '@/components/ui-base/checkbox';

const FormLogin = () => {
  const { formLogin, loading, submitData } = useAuthentication();

  return (
    <div className={cn('grid gap-6')}>
      <Form {...formLogin}>
        <form onSubmit={formLogin.handleSubmit(submitData)}>
          <div className="grid gap-5">
            <FormField
              control={formLogin.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your username"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formLogin.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="new-password"
                      autoCorrect="off"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formLogin.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                  </FormControl>
                  <FormLabel
                    htmlFor="rememberMe"
                    className="!mt-0 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="mt-5 bg-red-600 hover:bg-red-500">
              {loading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <div className="text-center">
              <a href="https://backend.hinodms.co.id/forgotpassword" className="text-blue-600 underline">
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormLogin;
