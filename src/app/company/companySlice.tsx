import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchState } from "types/BranchType";
import { CompanySliceState, CompanyState } from "types/CompanyType";

interface SavePayloadAction {
  company: CompanyState;
}
interface SaveBranchPayloadAction {
  branchs: BranchState[];
}
interface SelectBranchPayloadAction {
  branchId: string;
}

interface UpdatePayloadAction {
  company: CompanyState;
}

const initialState = {
  size: "",
  id: "",
  email: "",
  name: "",
  selectedBranch: "",
  branchs: [],
} as CompanySliceState;

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    saveCompany: (state, action: PayloadAction<SavePayloadAction>) => {
      state = { ...state, ...action.payload.company };
      localStorage.setItem("company_info", JSON.stringify(state));
    },
    clearCompany: (state) => {
      state = { ...initialState };
      localStorage.removeItem("company_info");
    },
    saveCompanyBranch: (
      state,
      action: PayloadAction<SaveBranchPayloadAction>
    ) => {
      state = { ...state, branchs: action.payload.branchs };
      localStorage.setItem("company_info", JSON.stringify(state));
    },
    selectBranch: (state, action: PayloadAction<SelectBranchPayloadAction>) => {
      state = { ...state, selectedBranch: action.payload.branchId };
      localStorage.setItem(
        "company_info",
        JSON.stringify(state)
      );
    },

    updateInfo: (state, action: PayloadAction<UpdatePayloadAction>) => {
      state = { ...state, ...action.payload.company };
      localStorage.setItem("company_info", JSON.stringify(state));
    },
  },
});

export const { saveCompany, clearCompany, updateInfo, saveCompanyBranch } =
  companySlice.actions;
export default companySlice.reducer;
