const db = require('../models');
const user = db.user;

exports.findAllUser = async (req, res) => {
    try {
        const data = await user.findAll();  // Using async/await for better readability
        res.status(200).json(data);  // Send the data as a response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return a 500 status for server error
    }
};

exports.createUser = async (req, res) => {
    try {
        // Input validation
        if (!req.body.name || !req.body.lastname || !req.body.salary) {
            return res.status(400).json({ message: "Name, lastname, and salary are required!" });
        }

        const newUser = {
            name: req.body.name,
            lastname: req.body.lastname,
            salary: req.body.salary,
            cost: req.body.cost || 0,  // Set default values if not provided
            shipment: req.body.shipment || 0,
            Vehicles: req.body.Vehicles || ''
        };

        // Create user
        await user.create(newUser);
        res.status(201).json({ message: "User created successfully!" });  // 201 status for successful creation
    } catch (error) {
        res.status(500).json({ message: error.message });  // Return error if creation fails
    }
};

exports.findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await user.findByPk(id);  // Fetch user by ID
        if (!data) {
            return res.status(404).json({ message: 'User not found' });  // If no user found, return 404
        }
        res.status(200).json(data);  // Return user data if found
    } catch (error) {
        res.status(500).json({ message: error.message });  // Server error
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUser = {
            name: req.body.name,
            lastname: req.body.lastname,
            salary: req.body.salary,
            cost: req.body.cost,
            shipment: req.body.shipment,
            Vehicles: req.body.Vehicles
        };

        const [updated] = await user.update(updateUser, { where: { id } });  // Update user by ID

        if (updated === 0) {
            return res.status(400).json({ message: "Update failed. User not found or no changes." });
        }
        res.status(200).json({ message: "User updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });  // Return error if update fails
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await user.destroy({ where: { id } });  // Delete user by ID

        if (deleted === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });  // Return error if delete fails
    }
};
