import cron from 'node-cron';

// import { userService } from '../services';

export const getNewUsers = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        // const newUsers = await userService.getNewUsers();
        // console.log(newUsers);
    });
};
