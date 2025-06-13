import { createSlice } from "@reduxjs/toolkit";

interface Module {
  _id: string;
  name: string;
  course: string;
  description?: string;
  lessons?: Array<{
    _id: string;
    name: string;
    description?: string;
    module: string;
  }>;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload: modules }) => {
      state.modules = modules;
    }, 
    addModule: (state, { payload: module }) => {
      state.modules = [...state.modules, module];
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m
      );
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;