import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm} from "@refinedev/react-hook-form";
import { FieldValues} from "react-hook-form";
//import { useNavigate } from "react-router-dom";
import Form from "components/common/Form";
import { resolve } from "dns";
import { readFile } from "fs";


const CreateProperty = () => {
  //const navigate = useNavigate();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true
  });
  const [propertyImage, setPropertyImage] = useState({name:"", url: ""});
  const {refineCore: { onFinish, formLoading }, 
    register, 
    handleSubmit,
} = useForm();

//const handleImageChange = () => {};
const handleImageChange = (file: File) => {
  const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result as string);
          fileReader.readAsDataURL(readFile);
      });

  reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result }),
  );
};

const onFinishHandler = async (data: FieldValues) => {
  if (!propertyImage.name) return alert("Veuillez télécharger une image de la propriété");

  if(user && user.email){
    await onFinish({
      ...data,
      photo: propertyImage.url,
      email: user.email,
  });
  }else{
    console.log("L'Email de l'utilisateur n'est pas disponible");
  }
 
};

return (
    <Form 
      type="Créer"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;