import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";

const MyProfile = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const { data, isLoading, isError } = useOne({
      resource: "users",
        id: user?.userid,
    });

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Erreur...</div>;

    return (
        <Profile
            type="Mon"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            properties={myProfile.allProperties}
        />
    );
};

export default MyProfile;