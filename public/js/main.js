let s = new sigma('container');

s.graph.read(
    {
        nodes: nodes,
        edges: edges
    }
);

s.refresh();