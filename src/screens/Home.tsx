import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Search, FileText, Users, LogOut } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from '@/assets/icons';
import Logo from '@/components/Logo';

// Placeholder data for documents
const myDocuments = [
  { id: '1', title: 'Research Paper Draft', lastEdited: '2 hours ago', isDraft: true },
  { id: '2', title: 'Literature Review', lastEdited: '1 day ago', isDraft: true },
  { id: '3', title: 'Project Proposal', lastEdited: '3 days ago', isDraft: false },
]

const sharedDocuments = [
  { id: '4', title: 'Team Meeting Notes', sharedBy: 'John Doe', lastEdited: '5 hours ago' },
  { id: '5', title: 'Collaborative Study', sharedBy: 'Jane Smith', lastEdited: '2 days ago' },
]

export default function Home() {
  const { logout, getAccessTokenSilently } = useAuth0();

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const check = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
    }

    check();
  })

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const createNewDocument = () => {
    // Placeholder for document creation functionality
    alert('Creating a new document')
  }

  const mergeDraft = (docId: string) => {
    // Placeholder for merge functionality
    alert(`Merging draft ${docId} into main version`)
  }

  const filterDocuments = (docs: any) => {
    return docs.filter((doc: any) => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className='container h-screen p-4 flex flex-col justify-start items-start'>
      <div className='w-full flex flex-row justify-between items-center'>
        <Logo />
        <Button onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      </div>
      <div className="container mx-auto p-4 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Documents</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search documents"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={createNewDocument} className="w-full">
            <PlusIcon/>
            New Document
          </Button>
        </div>

        <Tabs defaultValue="my-documents" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-documents">My Documents</TabsTrigger>
            <TabsTrigger value="shared-with-me">Shared with Me</TabsTrigger>
          </TabsList>

          <TabsContent value="my-documents">
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterDocuments(myDocuments).map((doc: any) => (
                  <Link to={`/document/${doc.id}`}>
                    <Card key={doc.id} className='hover:bg-gray-200'>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium hover:underline">
                            {doc.title}
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground"/>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>Last edited {doc.lastEdited}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="shared-with-me">
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterDocuments(sharedDocuments).map((doc: any) => (
                  <Link to={`/document/${doc.id}`}>
                    <Card key={doc.id} className='hover:bg-gray-200'>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {doc.title}
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Shared by {doc.sharedBy} • Last edited {doc.lastEdited}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}