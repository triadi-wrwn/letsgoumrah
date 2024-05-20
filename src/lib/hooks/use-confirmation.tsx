import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import * as React from 'react';

const DIALOG_LIMIT = 1;
const DIALOG_REMOVE_DELAY = 1000000;

type DialogType = AlertDialogProps & {
  id: string;
  title?: React.ReactNode;
  cancelText?: string;
  confirmedText?: string;
  description?: React.ReactNode;
  type?: 'custom' | 'delete' | 'deactivate' | 'activate' | 'submit';
  onConfirm?: () => void;
};

const actionTypes = {
  ADD_DIALOG: 'ADD_DIALOG',
  UPDATE_DIALOG: 'UPDATE_DIALOG',
  DISMISS_DIALOG: 'DISMISS_DIALOG',
  REMOVE_DIALOG: 'REMOVE_DIALOG'
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_DIALOG'];
      confirmation: DialogType;
    }
  | {
      type: ActionType['UPDATE_DIALOG'];
      confirmation: Partial<DialogType>;
    }
  | {
      type: ActionType['DISMISS_DIALOG'];
      dialogId?: DialogType['id'];
    }
  | {
      type: ActionType['REMOVE_DIALOG'];
      dialogId?: DialogType['id'];
    };

interface State {
  confirmations: DialogType[];
}

const dialogTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (dialogId: string) => {
  if (dialogTimeouts.has(dialogId)) {
    return;
  }

  const timeout = setTimeout(() => {
    dialogTimeouts.delete(dialogId);
    dispatch({
      type: 'REMOVE_DIALOG',
      dialogId: dialogId
    });
  }, DIALOG_REMOVE_DELAY);

  dialogTimeouts.set(dialogId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_DIALOG':
      return {
        ...state,
        confirmations: [action.confirmation, ...state.confirmations].slice(0, DIALOG_LIMIT)
      };

    case 'UPDATE_DIALOG':
      return {
        ...state,
        confirmations: state.confirmations.map(t =>
          t.id === action.confirmation.id ? { ...t, ...action.confirmation } : t
        )
      };

    case 'DISMISS_DIALOG': {
      const { dialogId } = action;

      if (dialogId) {
        addToRemoveQueue(dialogId);
      } else {
        state.confirmations.forEach(confirmation => {
          addToRemoveQueue(confirmation.id);
        });
      }

      return {
        ...state,
        confirmations: state.confirmations.map(t =>
          t.id === dialogId || dialogId === undefined
            ? {
                ...t,
                open: false
              }
            : t
        )
      };
    }
    case 'REMOVE_DIALOG':
      if (action.dialogId === undefined) {
        return {
          ...state,
          confirmations: []
        };
      }
      return {
        ...state,
        confirmations: state.confirmations.filter(t => t.id !== action.dialogId)
      };
  }
};

const listeners: Array<(_state: State) => void> = [];

let memoryState: State = { confirmations: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
}

type Dialog = Omit<DialogType, 'id'>;

function confirmation({ ...props }: Dialog) {
  const id = genId();
  const update = (props: DialogType) =>
    dispatch({
      type: 'UPDATE_DIALOG',
      confirmation: { ...props, id }
    });

  const dismiss = () => dispatch({ type: 'DISMISS_DIALOG', dialogId: id });

  dispatch({
    type: 'ADD_DIALOG',
    confirmation: {
      ...props,
      id,
      open: true,
      onOpenChange: open => {
        if (!open) dismiss();
      }
    }
  });

  return {
    id: id,
    dismiss,
    update
  };
}

function useConfirmation() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    confirmation,
    dismiss: (dialogId?: string) => dispatch({ type: 'DISMISS_DIALOG', dialogId })
  };
}

export { useConfirmation, confirmation };
