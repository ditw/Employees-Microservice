import { Seeder } from 'typeorm-extension';
import { Connection } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

export default class EmployeeSeeder implements Seeder {
  public async run(connection: Connection): Promise<any> {
    const names = ['Aman', 'Ebrahim', 'Alex', 'Jason', 'Danny', 'Daniel', 'Anderson', 'Kobos', 'Dutson', 'Nancy'];
    const salaries = [14500, 12500, 10000, 7500, 6000, 9500, 4800, 8750, 10450, 5900];
    const currencies = ['USD']; // Assumption is that the currency is unique for metrics, otherwise, a currency converter may be required against a unique global currency for accurate values
    const on_contracts = [true, false];
    const departments = ['Engineering', 'Marketing', 'Business', 'Finance', 'Sales', 'Health', 'Mining', 'Human Resources', 'Insurance', 'Education'];
    const sub_departments = ['Research', 'Development', 'Integration', 'Support', 'Maintenance'];
    let n=0, data = [];
    while(n < 20){
      data.push({
        name:  names[Math.floor(Math.random() * names.length)],
        salary: salaries[Math.floor(Math.random() * salaries.length)], 
        currency: currencies[0], 
        on_contract: on_contracts[Math.floor(Math.random() * on_contracts.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        sub_department: sub_departments[Math.floor(Math.random() * sub_departments.length)],
      });
      n++;
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Employee)
      .values(data)
      .execute()
    }
  }