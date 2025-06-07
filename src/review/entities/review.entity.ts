export class Review {
     @PrimaryGeneratedColumn()
  id: string;


 
  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  state:string;

  @Column({
    nullable: true,
  })
  city: string;

  @ManyToMany(
    (type) => ContractorSpeciality,
    (speciality) => speciality.contractor,
  )
  specialities: ContractorSpeciality[];


    @ManyToOne(
    (type) => Contractor,
    (contractor) => contractor.works, // Assuming Contractor has a 'works' property 
  )
  contractor: Contractor;

     @ManyToOne(
    (type) => Client,
    (client) => client.works, // Assuming Client has a 'works' property 
  )
    client: Client;
}
