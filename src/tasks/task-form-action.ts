import {redirect} from "react-router-dom";

// @ts-ignore
export async function action({request, params}) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  // await updateContact(params.id, updates);
  console.log(updates);
  return redirect(`/tasks/${params.id}`);
}