import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  useAssignRoleAndPermissions,
  usePermissionsGrouped,
  useRoles,
} from '@/features/settings/hooks';
import {
  EditAgentDialogProps,
  GroupPermissions,
  PermissionPerAgent,
  Role,
} from '@/features/settings/types';
import { useQueryClient } from '@tanstack/react-query';
import { Check, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ManageRoleDialog({
  agent,
  isOpen,
  onClose,
}: Readonly<EditAgentDialogProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<Role | null>(
    agent.role ?? null
  );
  const [permissionsGroupsToShow, setPermissionsGroupsToShow] = useState<
    GroupPermissions[]
  >([]);
  const [selectedPermissions, setSelectedPermissions] = useState<
    PermissionPerAgent[]
  >([]);

  const { roles, isLoading: isLoadingRoles } = useRoles();
  const { permissionsGroups, isLoading: isLoadingPermissionsGroups } =
    usePermissionsGrouped(
      agent.id,
      selectedRole?.id,
      isOpen && selectedRole?.id ? true : false
    );
  const assignRoleAndPermissions = useAssignRoleAndPermissions();

  useEffect(() => {
    if (permissionsGroups && isOpen) {
      setPermissionsGroupsToShow(permissionsGroups);
      setSelectedPermissions(
        permissionsGroups
          .map((pg) => pg.permissions)
          .flat()
          .filter((p) => p.selected || p.default)
      );
    }
  }, [permissionsGroups, isOpen]);

  const defaultPermissionsGroups: Partial<GroupPermissions>[] = [
    {
      code: 'all',
      title: t('settings.manageRoleDialog.allPermissionsGroup'),
    },
    {
      code: 'default',
      title: t('settings.manageRoleDialog.default'),
      permissions: agent.role?.permissions.map((p) => ({
        ...p,
        default: true,
        selected: true,
      }))!,
    },
  ];

  const changePermissionsGroups = (value: string) => {
    if (value === 'all' && permissionsGroups)
      setPermissionsGroupsToShow([...permissionsGroups]);
    else if (value === 'default') {
      setPermissionsGroupsToShow([
        defaultPermissionsGroups[1] as GroupPermissions,
      ]);
    } else if (permissionsGroups)
      setPermissionsGroupsToShow([
        ...permissionsGroups.filter((pg) => pg.code === value),
      ]);
  };

  const selectPermission = (permission: any) => {
    const isSelected = selectedPermissions.some(
      (p: PermissionPerAgent) => p.id === permission.id
    );

    if (isSelected) {
      setSelectedPermissions([
        ...selectedPermissions.filter(
          (p: PermissionPerAgent) => p.id !== permission.id
        ),
      ]);
    } else {
      setSelectedPermissions([
        ...selectedPermissions,
        { ...permission, selected: true },
      ]);
    }
  };

  const handleSave = async () => {
    await assignRoleAndPermissions.mutateAsync({
      agentId: agent.id,
      roleId: selectedRole!.id,
      permissionsIds: selectedPermissions
        .filter((p: PermissionPerAgent) => p.selected && !p.default)
        .map((p: PermissionPerAgent) => p.id),
    });
    queryClient.invalidateQueries({ queryKey: ['agents'] });
    queryClient.invalidateQueries({
      queryKey: ['permissionsGrouped', agent.id, selectedRole!.id],
    });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (!e) {
          onClose();
        }
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant='outline'
                className='px-4 hover:bg-background-primary-default transition duration-300 ease-in-out'
              >
                <Pencil className='h-7 w-10' />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className='bg-background-primary-default text-text-primary-default'>
            <p>{t('settings.manageRoleDialog.editAgent')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className='sm:max-w-4xl gap-8'>
        <DialogHeader className='max-w-1/2'>
          <DialogTitle>{`${t('settings.manageRoleDialog.title')} ${
            agent.firstName
          } ${agent.lastName}`}</DialogTitle>
          <DialogDescription>
            {t('settings.manageRoleDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center gap-4'>
          <div className='flex-1 flex  flex-col h-full gap-4'>
            <div className='flex justify-between'>
              <span className='text-base text-text-primary-default'>
                {t('settings.manageRoleDialog.predefinedRoles')}
              </span>
            </div>
            {isLoadingRoles ? (
              t('settings.manageRoleDialog.loading')
            ) : (
              <div className='flex flex-col gap-2 max-h-96 overflow-auto scrollbar-hide'>
                {roles?.map((role: Role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center gap-4 px-4 py-1.5 rounded cursor-pointer select-none 
                    ${
                      selectedRole?.id === role.id
                        ? 'bg-background-secondary-focus'
                        : 'bg-background-secondary-default'
                    }`}
                  >
                    {selectedRole?.id === role.id && (
                      <Check height={24} width={24} />
                    )}
                    <Label
                      htmlFor={role.code}
                      className='leading-6 cursor-pointer'
                    >
                      {role.title}
                    </Label>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Separator orientation='vertical' />
          <div className='flex-1 flex  flex-col h-full gap-4'>
            <div className='flex justify-between items-center'>
              <span className='text-base text-text-primary-default'>
                {t('settings.manageRoleDialog.show')}
              </span>
              <Select
                onValueChange={(value) => changePermissionsGroups(value)}
                defaultValue={defaultPermissionsGroups[0].code}
              >
                <SelectTrigger className='w-[200px] text-primary'>
                  <SelectValue
                    placeholder={defaultPermissionsGroups[0].title}
                  />
                </SelectTrigger>
                <SelectContent>
                  {defaultPermissionsGroups.map((group) => (
                    <SelectItem key={group.code} value={group.code!}>
                      {group.title}
                    </SelectItem>
                  ))}
                  <Separator orientation='horizontal' />
                  {permissionsGroups?.map((group: any) => (
                    <SelectItem key={group.code} value={group.code}>
                      {group.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col justify-evenly gap-2 max-h-96 overflow-auto scrollbar-hide'>
              {isLoadingPermissionsGroups ? (
                t('settings.manageRoleDialog.loading')
              ) : (
                <>
                  {permissionsGroupsToShow?.map((group: any) => (
                    <div key={group.code}>
                      <span className='text-sm text-text-secondary-default'>
                        {group.title}
                      </span>
                      <div className='flex flex-col justify-evenly gap-2 max-h-96'>
                        {group.permissions.map((permission: any) => (
                          <div
                            key={permission?.id}
                            className={`flex items-center justify-between bg-secondary px-4 py-1.5 rounded-md ${
                              permission?.default
                                ? 'bg-background-secondary-hover opacity-50 cursor-not-allowed'
                                : 'bg-background-secondary-default'
                            }`}
                          >
                            <Label
                              htmlFor={permission?.code}
                              className={`leading-5 ${
                                permission?.default
                                  ? 'cursor-not-allowed'
                                  : 'cursor-pointer'
                              }`}
                            >
                              {permission?.title}
                            </Label>
                            <Switch
                              id={permission?.code}
                              checked={selectedPermissions?.some(
                                (p: PermissionPerAgent) =>
                                  p.id === permission?.id
                              )}
                              onCheckedChange={() =>
                                selectPermission(permission)
                              }
                              className='cursor-pointer'
                              disabled={permission?.isActive}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className='sm:justify-end pt-4'>
          <div className='w-full flex justify-between items-center'>
            <Button type='button' variant='secondary'>
              {t('settings.manageRoleDialog.resendTheOtp')}
            </Button>
            <div className='flex items-center gap-4'>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='outline'
                  className='cursor-pointer'
                >
                  {t('settings.manageRoleDialog.cancel')}
                </Button>
              </DialogClose>
              <Button
                type='button'
                className='cursor-pointer'
                onClick={handleSave}
              >
                {t('settings.manageRoleDialog.save')}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
