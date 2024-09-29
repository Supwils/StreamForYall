import { getBlockedUsers } from '@/lib/block-service'
import { columns }  from './_components/columns'
import { DataTable } from './_components/data-table'
import { format } from 'date-fns';


const CommunityPage = async () => {
    
    const blockedUsers = await getBlockedUsers();

    const formattedBlockedUsers = blockedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id,
        imageUrl: block.blocked.imageUrl,
        username: block.blocked.username,
        createdAt: format(new Date(block.blocked.createdAt), "MM/dd/yyyy"),
     }));

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold">
                    Community Setting
                </h1>   
            </div>
            <DataTable columns={columns} data={formattedBlockedUsers} />
        </div>
    )
}
export default CommunityPage;