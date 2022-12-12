import Users from '../dbmodels/users'
import { datanotfoundindb, datanotfoundmessage, serverdownerror } from '../utils/applicationsvarialbes'
interface addressuses {
    Country: string,
    State: string,
    City: string,
    Address: string
}
export interface checkoutuses {
    Billingaddress: addressuses,
    Shippingaddress: addressuses,
    Customerinfo: {
        _id: string
    }
}

export const Chekoutser = async (checkoutinfo: checkoutuses) => {
    try {
        const updateusersr = await Users.updateOne(
            { _id: checkoutinfo.Customerinfo._id },
            {
                $addToSet:
                {
                    Billingaddress: checkoutinfo.Billingaddress,
                    Shippingaddress: checkoutinfo.Shippingaddress
                }
            },
            { new: true }
        )
        return updateusersr
    } catch (error:any) {
        if (error.message == datanotfoundmessage) throw datanotfoundindb
        throw serverdownerror
    }
}
