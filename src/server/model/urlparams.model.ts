import mongoose, { Model } from "mongoose";

type Params={
  email: string
 params: string
}
export type ParamsModel = Model<Params, object>;
const paramsSchema=new mongoose.Schema<Params,ParamsModel>({
  email:{
    type:String
  },
  params:{
    type:String
  }
})

export const Url_Params=mongoose.models.url_params || mongoose.model<Params,ParamsModel>("url_params",paramsSchema)
