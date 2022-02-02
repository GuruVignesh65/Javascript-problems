import {
    Box,
    Text,
    FormControl,
    FormLabel,
    Button
} from '@chakra-ui/react';

import { Select } from "chakra-react-select";
import { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react'
const DegreeSeperation = () => {

    const sourceFriend = [
        { value: 'sameer', label: 'Sameer' },
        { value: 'aayushi', label: 'Aayushi' },
        { value: 'bhaskar', label: 'Bhaskar' },
        { value: 'kamalnath', label: 'Kamalnath' },
        { value: 'shanti', label: 'Shanti' }
    ]
    const [sourceValue, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [enableButton, setEnableButton] = useState(true)
    const [result, setResult] = useState([])
    const [relation, setRelation] = useState('Select to find the relationship between people')
    // preprocess a JSON list of connections to an adjacency list Graph
    function connectionsListToGraph(connections) {
        const Graph = {}
        for (let { name, friends } of connections) {
            Graph[name] = friends // allow fast lookup of a given person's friends
        }
        return Graph
    }
    useEffect(() => {
        if (sourceValue && destination && sourceValue.value === destination.value) {
            setEnableButton(true)
        } else if (sourceValue && destination) {
            setEnableButton(false)
        }
    }, [sourceValue, destination])
    // return the list of connections between source and target
    function getConnections(source, target, connections) {
        const Graph = connectionsListToGraph(connections)
        const connectionPaths = []

        function findConnectionsDFS(source, target, path = [source], visited = {}) {
            // Don't search/visit the same friend twice (to avoid infinite loops)
            if (visited[source]) {
                return
            };

            // mark that we've searched the current source friend
            visited[source] = true;
            setResult([])
            setRelation('No Relationship Found')
            for (let friend of Graph[source]) {
                if (friend === target) {
                    setResult([])
                    connectionPaths.push(path.concat(target));
                } else {
                    findConnectionsDFS(friend, target, path.concat(friend), visited)
                }
            }
        }
        findConnectionsDFS(source, target);
        setRelation(connectionPaths.length)
        setResult(connectionPaths)
        return connectionPaths;
    }

    let connections = [
        {
            "name": "sameer",
            "friends": ["aayushi", "kamalnath"]
        },
        {
            "name": "aayushi",
            "friends": ["bhaskar"]
        },
        {
            "name": "kamalnath",
            "friends": ["shanti"]
        },
        {
            "name": "shanti",
            "friends": ["bhaskar"]
        }
    ]
    return (
        <>
            <Box m='5'>
                <Heading as='h2' size='xl' ml='5'>
                    Relationship between people
                </Heading>
            </Box>
            <Box d='flex' m='5' w='100%'>
                <Box mr='5' w='30%'>
                    <FormControl p={4}>
                        <FormLabel>
                            Source
                        </FormLabel>
                        <Select
                            value={sourceValue}
                            onChange={(e) => { setSource(e) }}
                            options={sourceFriend}
                            placeholder="Select Source Friend"
                            hasStickyGroupHeaders
                        />
                    </FormControl>
                </Box>
                <Box w='30%'>
                    <FormControl p={4}>
                        <FormLabel>
                            Destination
                        </FormLabel>
                        <Select
                            value={destination}
                            onChange={(e) => {
                                setDestination(e)
                            }}
                            options={sourceFriend}
                            placeholder="Select Destination friend"
                            hasStickyGroupHeaders
                        />
                    </FormControl>
                </Box>
            </Box>
            <Box m='5' >
                <Button
                    m='5'
                    colorScheme='teal'
                    size='md'
                    isDisabled={enableButton}
                    onClick={() => { getConnections(sourceValue.value, destination.value, connections) }}
                >
                    Find Relation
                </Button>
            </Box>
            <Box m='5'>
                <Box>
                    {(!result.length && `${relation}`) || (result.length && <>
                        <Text>There are {relation} relationship found</Text>
                        {result.map((item, key) => {
                            return <Text>{item.join('  >  ')}</Text>
                        })}
                    </>)}
                </Box>
            </Box>
        </>
    )
}

export default DegreeSeperation
