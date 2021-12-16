import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "types/CompanyType";


interface SavePayloadAction {
  company: CompanyState;
}

interface UpdatePayloadAction {
  company: CompanyState;
}

const initialState = {
  category_id: "",
  id: "",
  country_id: "",
  email: "",
  facebook: "",
  instagram: "",
  whats_app: "",
  name: "",
  phone_number: "",
} as CompanyState;

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    saveCompany: (state, action: PayloadAction<SavePayloadAction>) => {
      state = { ...action.payload.company };
      localStorage.setItem(
        "company_info",
        JSON.stringify(action.payload.company)
      );
    },
    clearCompany: (state) => {
      state = {
        category_id: "",
        id: "",
        country_id: "",
        email: "",
        facebook: "",
        whats_app: "",
        instagram: "",
        name: "",
        phone_number: "",
      };

      localStorage.removeItem("company_info");
    },
    updateInfo: (state, action: PayloadAction<UpdatePayloadAction>) => {
      state = action.payload.company;
      localStorage.setItem(
        "company_info",
        JSON.stringify(action.payload.company)
      );
    },
  },
});

export const { saveCompany, clearCompany, updateInfo } = companySlice.actions;
export default companySlice.reducer;
