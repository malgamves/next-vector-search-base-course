"use client";

import { RAG } from "../utils/actions.ts";
import { useState, useTransition } from "react";
import React from "react";
import { GenerativeReturn } from "weaviate-client";
import { Wiki } from "../types.ts";
import References from "./References.tsx";
import GenResult from "../components/GenResult.tsx";
import Loading from "../components/Loading.tsx";
import Grid from "../components/Grid.tsx";
import Cover from "../components/Cover.tsx";
import InputCover from "./InputCover.tsx";
import Container from "./Container.tsx";


export default function RAGResult() {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchResponse, setSearchResponse] = useState<
        GenerativeReturn<Wiki> | null
    >(null);

    const [isPending, startTransition] = useTransition();

    const handleSubmit = async () => {
        setSearch(false)
        setLoading(true)
        if (searchTerm.length > 0) {
            startTransition(async () => {
                const searchResponse = await RAG(
                    searchTerm,
                );
                setSearchResponse(searchResponse);
                setSearch(true)
                setLoading(false)
            });
        }
    };

    return (
        <Container>
            <InputCover> 
                <input type="text"
                    id="SearchTerm"
                    placeholder="what are you looking for?"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.currentTarget.value)
                    }}
                    className="input-main" />
            </InputCover>
            <Cover> 
                <button
                    className="btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}>
                    Search
                </button>
            </Cover>
            {search && searchResponse &&
                <div>
                    <Grid>
                        <GenResult response={searchResponse} />
                        <References response={searchResponse} />
                    </Grid>
                </div>

            }
            {loading &&
                <Loading />}
        </Container>
    )
}