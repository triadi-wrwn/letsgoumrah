import { Input } from '@/components/ui-base/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-base/form';
import GeneralPageForm from '@/components/ui-group/general-page-form/general-page-form';
import SubmitAction from '@/components/ui-group/submit-action/submit-action';
import useFormUser from '@/features/setup-config/user-management/hooks/form.hook';
import Combobox from '@/components/ui-group/combobox/combobox';

const FormUser = () => {
  const { title, isEdit, isFetching, isSubmiting, form, onSubmit, userGroupOptions, departmentOptions } = useFormUser();
  return (
    <GeneralPageForm title={title} isLoading={isFetching || isSubmiting}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} disabled={isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee No.</FormLabel>
                <FormControl>
                  <Input placeholder="Employee No." {...field} disabled={isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled={isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userGroupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Group</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Select user group"
                    options={userGroupOptions}
                    closeOnSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Position</FormLabel>
                <FormControl>
                  <Input placeholder="Job Position" {...field} disabled={isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Select Department"
                    options={departmentOptions}
                    closeOnSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitAction />
        </form>
      </Form>
    </GeneralPageForm>
  );
};

export default FormUser;
