const getAllEmployees = async () => {
    try {
        const employees = await Employee.findAll();  // Assuming Sequelize ORM or MySQL2 query
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

