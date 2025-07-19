
//! Con esto puedo hacer una actualizacion de un User apartir de tipos primitivos, que pueden venir de un bd, etc, en User deberia tener un metodo updateFromPrimitives(props: UpdateUserProps).. 
//! Despues revisar si vale la pena..

//! Deberia ir en DTO application??
export type UpdateUserProps = Partial<{ fullName: string, password: string, role: string, status: string }>;