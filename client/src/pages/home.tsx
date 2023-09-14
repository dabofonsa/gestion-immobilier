 import React from "react";
 import { useList } from '@refinedev/core';
 import { Typography, Box, Stack } from '@mui/material';

import { PieChart, PropertyReferrals, TotalRevenue, PropertyCard, TopAgent } from "components";


 const Home = () =>{
    const { data, isLoading, isError } = useList({
        // resource: "api/v1/properties",
        resource: "properties",
        config: {
            pagination: {
                pageSize : 4,
            },
        },
    });

    const latestProperties = data?.data ?? [];

    if (isLoading) return <Typography>Chargement...</Typography>;
    if (isError) return <Typography>Une erreur s'est produite</Typography>;
    
    return(
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Tableau de bord
            </Typography>
            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart 
                    title="Propriétés à Vendre"
                    value= {684}
                    series={[75, 25]}
                    colors={['#275be8', '#e4e8ef']}
                />
                <PieChart 
                    title="Propriétés à Louer"
                    value= {550}
                    series={[60, 40]}
                    colors={['#275be8', '#e4e8ef']}
                />
                <PieChart 
                    title="Clients Totaux"
                    value= {5684}
                    series={[75, 25]}
                    colors={['#275be8', '#e4e8ef']}
                />
                <PieChart 
                    title="Propriétés pour les villes"
                    value= {555}
                    series={[75, 25]}
                    colors={['#275be8', '#e4e8ef']}
                />
            </Box>
            <Stack marginTop="25px" width="100%" direction={{xs: 'column', lg: 'row'}} gap={5}>
                <TotalRevenue/>
                <PropertyReferrals/>

            </Stack>
            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Dernières propriétés
                </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
 } 

 export default Home;
 